import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Valeriia Makushchenko</p>
          <p>
            Contact me:
            <a href="mailto:l.makushchenko@gmail.com">
              {"  "}l.makushchenko@gmail.com
            </a>
            {/* <br />
            <a href="tel:+14384964197">+1 (438) 496 41 97</a> */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
