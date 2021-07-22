import { FC } from "react";

import {
  Stat,
  Box,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";

import getSymbolFromCurrency from "currency-symbol-map";

const CurrencyExchangeRateCard: FC<{
  name: string;
  value: number;
}> = ({ name, value }) => {
  const priceDelta = 2;

  return (
    <Box
      rounded="md"
      boxShadow="xl"
      h={100}
      w={{ sm: 170, base: "100%" }}
      m="2"
      pl="4"
      pt="2"
      _hover={{ transform: "scale(1.05)" }}
      transition="ease-in-out 0.2s"
    >
      <Stat>
        <StatLabel>{name}</StatLabel>
        <StatNumber>{`${value} ${
          getSymbolFromCurrency(name) || ""
        }`}</StatNumber>

        {priceDelta && Number(priceDelta) !== 0 && (
          <StatHelpText>
            <StatArrow
              type={Number(priceDelta) > 0 ? "increase" : "decrease"}
            />
            {priceDelta?.toLocaleString()}%
          </StatHelpText>
        )}
      </Stat>
    </Box>
  );
};

export default CurrencyExchangeRateCard;
