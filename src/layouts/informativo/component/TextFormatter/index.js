import DOMPurify from "dompurify";

function TextFormatter({ texto }) {
  const sanitizer = DOMPurify.sanitize(texto);
  // eslint-disable-next-line
  return <div dangerouslySetInnerHTML={{ __html: sanitizer }} />;
}
export default TextFormatter;
