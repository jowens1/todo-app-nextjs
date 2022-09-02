const Footer = () => {
  return (
    <div
      className={
        'absolute bottom-0 w-full py-4 text-center justify-center border-black border-t-2'
      }
    >
      <p>
        The following listed items were used in development of this personal
        project.
      </p>
      <p>
        <a href="https://nextjs.org/">NextJs</a>,{' '}
        <a href="https://www.typescriptlang.org/">Typescript</a>,{' '}
        <a href="https://tailwindcss.com/">Tailwindcss</a>,{' '}
        <a href="https://trpc.io/">tRPC</a>,{' '}
        <a href="https://next-auth.js.org/">NextAuth</a>,{' '}
        <a href="https://www.prisma.io/">Prisma</a>,{' '}
        <a href="https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps">
          Github Oauth
        </a>
      </p>
      <p>Written by: Justin Owens</p>
    </div>
  );
};

export default Footer;
