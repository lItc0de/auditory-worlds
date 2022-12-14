import React from 'react';
import { Helmet } from 'react-helmet';

// import Sidebar from './sidebar';
import BackgroundImage from './background-image';

import classNames from 'classnames/bind';
import * as styles from './page-layout.module.scss';

const cx = classNames.bind(styles);

type Props = {
  children: any;
  pageContext: {
    page?: string;
  };
};

const Layout: React.FC<Props> = ({ children, pageContext }) => {
  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: 'de',
        }}
      >
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Helmet>
      {/* <Sidebar pageContext={pageContext} /> */}

      <BackgroundImage />

      <main className={cx('main')}>
        <div className={cx('mainContainer')}>{children}</div>
      </main>

      <footer className={cx('footer')}>
        <div className={cx('footerContainer')}>
          2022&nbsp;•&nbsp;Basti,&nbsp;Emma,&nbsp;Su
        </div>
      </footer>
    </>
  );
};

export default Layout;
