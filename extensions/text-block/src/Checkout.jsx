import {
  reactExtension,
  Icon,
  Pressable,
  Text,
  List,
  ListItem,
  ScrollView,
  Grid,
  BlockLayout,
  useSettings,
  TextBlock
} from '@shopify/ui-extensions-react/checkout';
import { useEffect } from 'react';
import { useState } from 'react';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);
 
function Extension() {
  const {title,text_line_1} = useSettings();
  const [active, setActive] = useState(false);
  const [textBlock, setTextBlock] = useState([]);

  const handlePressable = (e) => {
    console.log("hererere");
    setActive(!active);
  }

  useEffect(() => {
    const lines = text_line_1?.split('\n').filter(line => line.trim() !== '');
    setTextBlock(lines);

  },[text_line_1]); 

  return (
    <>
          <Pressable
          border="none"
          minInlineSize={"fill"}
          onPress={(e) => handlePressable(e)}
        >
          <Grid
              columns={['80%', '20%']}
              rows={['fill']}
              spacing={"base"}
            >
            <Text size="large" >{title}</Text>
            <BlockLayout inlineAlignment="end" blockAlignment="center">
            {
              active ? (<Icon source="chevronDown" size="base" />) : (<Icon source="chevronRight" size="base" />)
            }
            </BlockLayout>
            
            </Grid>
        </Pressable>
          {
            (active && text_line_1 ) ? (
              <TextBlock appearance="subdued">
              <ScrollView padding={"base"} maxBlockSize={500} border="none">
                <List marker="number">
                  {
                    textBlock?.map((item) => {
                      return (
                        <ListItem>{item}</ListItem>
                      )
                    })
                  }
                </List>
              </ScrollView>
            </TextBlock>
            ) : ""
          }
    </>
  );
}