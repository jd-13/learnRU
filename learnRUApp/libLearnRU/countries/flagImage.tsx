import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

/**
 * Given a height, displays a flag with the correct width to maintain the original aspect ratio.
 */
export const FlagImage = (props) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const imageData = Image.resolveAssetSource(props.flagURL);
        setWidth(imageData.width * (props.height / imageData.height));
    });

    return (
        <View style={{alignSelf: "center", margin: 20}}>
            <Image source={props.flagURL} style={{width: width, height: props.height}}/>
        </View>
    );
};
