import { format } from "date-fns";

type Props = {
  dateString: DateValue;
};

type DateValue =
  | string
  | number
  | Date
  | { date?: string | number | Date }
  | null
  | undefined;

function parseDate(value: DateValue): Date | null {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "object") {
    return parseDate(value.date);
  }

  if (typeof value === "string") {
    const trimmedValue = value.trim();
    return trimmedValue ? new Date(trimmedValue) : null;
  }

  return new Date(value);
}

const DateFormatter = ({ dateString }: Props) => {
  const date = parseDate(dateString);

  if (!date || Number.isNaN(date.getTime())) {
    return <time>Invalid date</time>;
  }

  return (
    <time dateTime={date.toISOString()}>{format(date, "MMMM d, yyyy")}</time>
  );
};

export default DateFormatter;
