import {Body, Card, CardItem, Container, Content, Text} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

const AboutScreen = () => {
  return (
    <Container>
      <Content>
        <Card>
          <CardItem header>
            <Text>A throwaway account manager: </Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                Add, edit and delete throwaway and their details. This
                application operates offline. All the account information is
                stored locally,
                <Text style={styles.highlight}> unencrypted</Text>
              </Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Text>Do not store sensitive information in this application.</Text>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default AboutScreen;
