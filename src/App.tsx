import { MouseEvent as _MouseEvent, useState } from 'react';
type MouseEvent<E = Element> = _MouseEvent<E> & { target: E };
type Route = { path: string; render: () => JSX.Element; label: string };

const App = () => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  const handleRouteClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const path = e.target.getAttribute('href')!;
    setCurrentPath(path);
    window.history.pushState({}, '', path);
  };

  const routes: Route[] = [
    { path: '/', render: () => <h1>Home</h1>, label: 'Home' },
    { path: '/about', render: () => <h1>About</h1>, label: 'About' },
  ];
  const currentRoute: Route | undefined = routes.find(({ path }) => path === currentPath);

  return (
    <div>
      <nav>
        {routes.map(({ path, label }) => (
          <a key={path} href={path} onClick={handleRouteClick}>
            {label}
          </a>
        ))}
      </nav>
      <main>{currentRoute ? currentRoute.render() : <h1>404</h1>}</main>
    </div>
  );
};

export default App;
