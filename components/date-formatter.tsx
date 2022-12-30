import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
  time?: boolean;
};

const DateFormatter = ({ dateString, time }: Props) => {
  const date = new Date(dateString);
  if (time == true) {
    return (
      <time dateTime={date.toLocaleDateString("en-US")}>
        {date.toLocaleDateString("en-US", {
          hour: "numeric",
          minute: "numeric",
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
    );
  }

  return <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>;
};

export default DateFormatter;
