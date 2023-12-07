import React, {useEffect, useState} from 'react';
import './Storis.css';
import Stories from 'react-insta-stories';

const StorisContent = ({data}) => {
    const [status, setStatus] = useState(false);
    const [view, setView] = useState(false);
    console.log(data)
    return (
        <>
            <div onClick={() => setStatus(true) || setView(true)} className="storis_content">
                <img style={{border: view ? "2px solid transparent" : "2px solid var(--primary)"}} src={data.shop_logo} alt=""/>
            </div>
            {status ? data ? (
                <div className="status">
                    <Stories
                        stories={data.shop_logo}
                        width={"100%"}
                        height={"100vh"}
                        onAllStoriesEnd={() => setStatus(false)}
                    />
                </div>
            ) : (
                ""
            ) : ""
            }
        </>
    );
};

export default StorisContent;