import Container from "./container";
import Link from "next/link";

import { type Post } from "../interfaces/post";
import DateFormatter from "./date-formatter";

type Props = {
  post: Post;
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
