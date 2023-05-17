import React from 'react'
import {Card, Image} from "antd";
import {useParams} from "react-router-dom";
import {getUserWordCloud} from "../../helpers";

export const WordCloud = () => {
    const {userName} = useParams();
    return (
        <Card bordered={true} title={'Word Cloud by topic'}>
            <img alt={'wordCloud'} style={
                {
                    width:'100%',
                    height: '290px',
                    objectFit: 'cover'
                }
            }
                 src={getUserWordCloud(userName)}
            />
        </Card>
    )
}
