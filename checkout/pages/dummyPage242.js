import { useEffect, lazy } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { get } from 'lodash'; // 71.5k
import * as mui from '@mui/base'; // 146.8k
import zxcvbn from 'zxcvbn'; // 819.1k
import moment from 'moment'; // 61k
const Home = process.browser ? lazy(() => import('home/home')) : () => null;
const Page = props => {
    const router = useRouter();
    useEffect(() => {
        if (get(props, 'needsPush')) {
            // since this plugin only supports client side, we need next to re-push the route, causing get initial props to run again - this time its the federated one and not the ssr'd placeholder
            router.push(router.route);
        }
    }, []);
    if (props.needsPush) {
        return null;
    }
    console.log(zxcvbn('Tr0ub4dour&3'), moment().format());
    return (
        <>
            <Home {...props} />
            <mui.Button variant="contained">Hello world</mui.Button>
        </>
    );
};
Page.getInitialProps = async ctx => {
    if (process.browser) {
        const page = (await import('home/home')).default;
        console.log('running get initial props client side');
        if (page.getInitialProps) {
            return page.getInitialProps(ctx);
        }
    }
    return {
        needsPush: true,
    };
};
export default Page;
