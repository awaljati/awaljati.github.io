export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p>&copy; {new Date().getFullYear()} <span translate="no">Awal Jati Asmoro</span></p>
        <p className="footer-credits">
          {/* TODO: credit the Milky Way photo (photographer, source link, license),
              e.g. "Milky Way photo: <a href='…'>Name</a> / Unsplash". */}
          Milky Way photo: credit to be added. 3D lanyard adapted from{' '}
          <a className="text-link" href="https://reactbits.dev" rel="noopener">React Bits</a>.
        </p>
      </div>
    </footer>
  );
}
