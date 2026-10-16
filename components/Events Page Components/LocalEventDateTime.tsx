"use client";

import { useEffect, useState } from "react";

interface LocalEventDateTimeProps {
  eventStartsAt: string;
}

export default function LocalEventDateTime({
  eventStartsAt,
}: LocalEventDateTimeProps) {
  const [localDateTime, setLocalDateTime] = useState<string>("");

  useEffect(() => {
    const date = new Date(eventStartsAt);

    if (Number.isNaN(date.getTime())) {
      setLocalDateTime("Date to be announced");
      return;
    }

    const localDate = new Intl.DateTimeFormat(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

    const localTime = new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(date);

    setLocalDateTime(`${localDate} · ${localTime}`);
  }, [eventStartsAt]);

  return <span>{localDateTime || "Loading local time…"}</span>;
}
