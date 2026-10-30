import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  redirect,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Loading from "./components/Loading";
import BottomNav from "./components/bottomNav";
import TopNav from "./components/topNav";
import { supabase } from "./lib/supabaseClient";
import { loadProfile } from "./lib/profileStorage";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Runs once when the app is opened (before any page shows).
// New users are sent to sign up first, then onboarding.
const startPages = ["/signup", "/login", "/onboarding"];

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const { pathname } = new URL(request.url);
  if (startPages.some((page) => pathname.startsWith(page))) return null;

  // 1. Not logged in → Sign up
  const { data } = await supabase.auth.getSession();
  if (!data.session) throw redirect("/signup");

  // 2. Logged in, but onboarding not done yet → Onboarding
  if (!loadProfile()) throw redirect("/onboarding");

  return null;
}

export default function App() {
  // No bottom nav on sign up, log in and onboarding (matches Figma)
  const { pathname } = useLocation();
  const hideNav = ["/onboarding", "/signup", "/login"].some((page) =>
    pathname.startsWith(page)
  );

  return (
    <>
      <TopNav />
      <Outlet />
      {!hideNav && <BottomNav />}
    </>
  );
}

export function HydrateFallback() {
  return <Loading />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}