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

// Mocked data
const rateDelta = 2;

const CurrencyExchangeRateCard: FC<{
  name: string;
  value: number;
}> = ({ name, value }) => {
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

        {rateDelta && Number(rateDelta) !== 0 && (
          <StatHelpText>
            <StatArrow type={rateDelta > 0 ? "increase" : "decrease"} />
            {rateDelta?.toLocaleString()}%
          </StatHelpText>
        )}
      </Stat>
    </Box>
  );
};

export default CurrencyExchangeRateCard;
