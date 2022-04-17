import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

function Home() {
  const { user } = useUser();

  return (
    <div>
      Home

      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();

export default Home;