import { format } from "date-fns";

type Props = {
  dateString: any; // Accept any type for better debugging
};

const DateFormatter = ({ dateString }: Props) => {
  console.log("Raw dateString:", dateString, "Type:", typeof dateString);

  if (!dateString) {
    console.error("Invalid dateString:", dateString);
    return <time>Invalid date</time>;
  }

  try {
    let date: Date;

    // Handle if dateString is already a Date object
    if (dateString instanceof Date) {
      date = dateString;
    }
    // Handle if dateString is an object with a 'date' property
    else if (typeof dateString === "object" && dateString.date) {
      date = new Date(dateString.date);
    }
    // Handle if dateString is a string
    else if (typeof dateString === "string") {
      date = new Date(dateString.trim());
    }
    // Fallback for unexpected cases
    else {
      throw new Error("Unsupported date format");
    }

    // Validate the date
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    // Format the date
    return (
      <time dateTime={date.toISOString()}>{format(date, "MMMM d, yyyy")}</time>
    );
  } catch (error) {
    console.error("Failed to parse date:", error, "dateString:", dateString);
    return <time>Invalid date</time>;
  }
};

export default DateFormatter;
