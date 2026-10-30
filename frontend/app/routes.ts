import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/explore.jsx"),
  route("trails", "routes/trails.jsx"),
  route("blog", "routes/blog.jsx"),
  route("blog/category/:category", "routes/blogCategory.jsx"),
  route("blog/:id", "routes/blogDetail.jsx"),
  route("profile", "routes/profile.jsx"),
  route("onboarding", "routes/onboarding.jsx"),
  route("signup", "routes/signup.jsx"),
  route("login", "routes/login.jsx"),
  route("stamps", "routes/stamps.jsx"),
  route("saved", "routes/saved.jsx"),
  route("trails/:list", "routes/trailList.jsx"),
  route("trail/:id", "routes/trailDetail.jsx"),
  route("create-trail", "routes/createTrail.jsx"),
  // Must stay last: catches every address that doesn't exist → 404 page
  route("*", "routes/notFound.jsx"),
] satisfies RouteConfig;