import Layout from '../components/Layout';

export default () => (
    <Layout>
        <h1>
            login form
        </h1>
        <form action="/login" method='post'>
            <input type="text" name='username'/>
            <input type="password" name='password'/>
            <button type='submit'>login</button>
        </form>
    </Layout>
);