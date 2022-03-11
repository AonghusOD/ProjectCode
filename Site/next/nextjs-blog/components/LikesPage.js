import React from 'react'
import { Container, Row, Col } from '@nextui-org/react';
import { Card, Text, Spacer } from '@nextui-org/react';



function LikesPage() 
{
  return (
    <section>
      <h1>Likes</h1>
      <Container gap={0}>
  <Row gap={1}>
    <Col>
        <Card color="primary">
          <Text h6 size={15} color="white" css={{ m: 0 }}>
            1 of 2
          </Text>
        </Card>
    </Col>
    <Col>
        <Card color="primary">
          <Text h6 size={15} color="white" css={{ m: 0 }}>
            2 of 2
          </Text>
        </Card>
    </Col>
  </Row>
  <Spacer y={1}/>
  <Row gap={1}>
    <Col>
        <Card color="primary">
          <Text h6 size={15} color="white" css={{ m: 0 }}>
            1 of 3
          </Text>
        </Card>
    </Col>
    <Col>
        <Card color="primary">
          <Text h6 size={15} color="white" css={{ m: 0 }}>
            2 of 3
          </Text>
        </Card>
    </Col>
    <Col>
        <Card color="primary">
          <Text h6 size={15} color="white" css={{ m: 0 }}>
            3 of 3
          </Text>
        </Card>
    </Col>
  </Row>
</Container>
    </section>
  );
}
  
  export default LikesPage;