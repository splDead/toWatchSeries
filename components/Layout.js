import Header from './Header';

import '../static/css/main.css';

const layoutStyle = {
    margin: '0 auto',
    padding: 0,
    width: 900
};

const Layout = props => (
    <div style={layoutStyle}>
        <Header />
        {props.children}
    </div>
);

export default Layout;