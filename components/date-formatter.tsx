import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
  time?: boolean;
};

const DateFormatter = ({ dateString, time }: Props) => {
  const date = parseISO(dateString);
  if (time == true) {
    return (
      <time dateTime={dateString}>{format(date, "hh:mm a, LLLL	d, yyyy")}</time>
    );
  }

  return <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>;
};

export default DateFormatter;
