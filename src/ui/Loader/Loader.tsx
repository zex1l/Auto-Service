import { LoadingOutlined } from "@ant-design/icons";
import css from './Loader.module.scss'

const Loader = () => {
    return (
        <div className={css.loader}>
            <LoadingOutlined style={{fontSize: 64}}/>
        </div>
    );
};

export default Loader;