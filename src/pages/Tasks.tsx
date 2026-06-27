import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useTasks } from "@/stores/useTasks";

export default function Tasks() {
  const { tasks, add, toggle, remove } = useTasks();
  const [text, setText] = useState("");
  const submit = () => {
    if (text.trim()) {
      add(text.trim());
      setText("");
    }
  };
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground">
          Persisted to localStorage — refresh and they stay.
        </p>
      </div>
      <div className="flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Add a task…"
        />
        <Button onClick={submit}>Add</Button>
      </div>
      <Card>
        <CardContent className="divide-y p-0">
          {tasks.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No tasks yet.
            </p>
          )}
          {tasks.map((t) => (
            <div key={t.id} className="flex items-center gap-3 p-3">
              <Checkbox checked={t.done} onCheckedChange={() => toggle(t.id)} />
              <span
                className={
                  t.done
                    ? "flex-1 text-muted-foreground line-through"
                    : "flex-1"
                }
              >
                {t.text}
              </span>
              <Button variant="ghost" size="icon" onClick={() => remove(t.id)}>
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
