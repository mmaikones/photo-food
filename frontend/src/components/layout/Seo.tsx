import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description?: string;
}

export default function Seo({ title, description }: SeoProps) {
  return (
    <Helmet>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:title" content={title} />
    </Helmet>
  );
}
