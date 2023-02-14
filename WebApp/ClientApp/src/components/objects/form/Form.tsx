import { Button } from '@mui/material';
import type { ReactElement } from 'react';

type Props = {
    children: ReactElement;
    onSubmit: () => void;
};

const Form = ({ children, onSubmit }: Props) => {

    return (
        <form onSubmit={onSubmit}>
            {children}
            <div>
                <Button type="submit">Submit</Button>
            </div>
        </form>
    );
};

export default Form;
