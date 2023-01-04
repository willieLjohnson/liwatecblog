import { Markdown } from "./markdown-text";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Markdown content={content} />
    </div>
  );
};

export default PostBody;
