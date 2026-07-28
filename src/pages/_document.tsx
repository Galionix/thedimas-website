import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

type DocumentProps = DocumentInitialProps & {
  locale?: string;
};

export default function SiteDocument({ locale }: DocumentProps) {
  return (
    <Html lang={locale === "ua" ? "uk" : "en"}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

SiteDocument.getInitialProps = async (
  context: DocumentContext
): Promise<DocumentProps> => {
  const initialProps = await Document.getInitialProps(context);

  return {
    ...initialProps,
    locale: context.locale,
  };
};
