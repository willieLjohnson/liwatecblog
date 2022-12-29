import Container from "./container";
import cn from "classnames";
import Link from "next/link";
import {
  EXAMPLE_PATH,
  TWITTER,
  GITHUB,
  YOUTUBE,
  LIWATEC,
} from "../lib/constants";

import PostType from "../interfaces/post";
import Socials from "./socials";
import DateFormatter from "./date-formatter";

type Props = {
  post: PostType;
};

const PostFooter = ({ post }: Props) => {
  return (
    <div>
      <Container>
        <div className="p-1 text-center text-sm m-1">
          <Link href={post.history} className="underline font-extrabold">
            Updated On: <DateFormatter dateString={post.updated} time={true} />{" "}
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default PostFooter;
