import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CalendarComponent() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Selecciona una fecha</CardTitle>
      </CardHeader>
      <CardContent>
        <Popover>
          {/* Así no usamos asChild: */}
          <PopoverTrigger>
            <Button variant="outline" className="w-full justify-between">
              <span>
                {selectedDate
                  ? selectedDate.toLocaleDateString(undefined, {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })
                  : "Seleccionar fecha"}
              </span>
              <CalendarIcon className="w-5 h-5 text-muted-foreground" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}
