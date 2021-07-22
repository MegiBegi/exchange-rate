import { FC } from "react";

import { Card, Text } from "@geist-ui/react";

const CurrencyExchangeRateCard: FC<{
  name: string;
  value: number;
}> = ({ name, value }) => (
  <Card shadow>
    <Text type="secondary" style={{ margin: 0 }}>
      {name}
    </Text>

    <Text size="1.5rem" style={{ margin: 0 }}>
      {value}
    </Text>
  </Card>
);

export default CurrencyExchangeRateCard;
