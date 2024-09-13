const Footer = () => {
  return (
    <footer className="py-6 md:py-0 md:px-8 bg-black text-white border-t border-gray-800">
      <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Build by{" "}
          <a
            href="https://mikopersonalweb.vercel.app"
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            Miko
          </a>
          . Source code available on{" "}
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Github
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
