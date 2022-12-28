import Container from "./container";
import cn from "classnames";
import {
  EXAMPLE_PATH,
  TWITTER,
  GITHUB,
  YOUTUBE,
  LIWATEC,
} from "../lib/constants";

type Props = {
  preview?: boolean;
};

const Alert = ({ preview }: Props) => {
  return (
    <div
      className={cn("border-b", {
        "bg-neutral-800 border-neutral-800 text-white": preview,
        "bg-neutral-50 border-neutral-200": !preview,
      })}
    >
      <Container>
        <div className="p-1 text-center text-sm">
          {preview ? (
            <>
              This page is a preview.{" "}
              <a
                href="/api/exit-preview"
                className="underline hover:text-teal-300 duration-200 transition-colors"
              >
                Click here
              </a>{" "}
              to exit preview mode.
            </>
          ) : (
            <>
              <h4 className="text-center text-lg m-2 space-x-10">
                <a
                  href={TWITTER}
                  className="font-semibold hover:underline hover:text-blue-600 hover:font-extrabold duration-200 transition-colors"
                >
                  LOG
                </a>
                <a
                  href={YOUTUBE}
                  className="font-semibold hover:underline hover:text-blue-600 hover:font-extrabold duration-200 transition-colors"
                >
                  ABOUT
                </a>
                <a
                  href={GITHUB}
                  className="font-semibold hover:underline hover:text-blue-600 hover:font-extrabold duration-200 transition-colors"
                >
                  GALLERY
                </a>
                <a
                  href={LIWATEC}
                  className="font-semibold hover:underline hover:text-blue-600 hover:font-extrabold duration-200 transition-colors"
                >
                  LTSC
                </a>
              </h4>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Alert;
