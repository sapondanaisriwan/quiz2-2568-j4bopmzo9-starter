import { Card, Group, Badge, ActionIcon, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

type FoodProps = {
  id: string;
  name: string;
  price: number | string;
  quantity: number | string;
  category: string;
};

interface ItemCardProps {
  items: FoodProps[];
  onDelete: (id: string) => void;
}

export default function ItemCard({ items, onDelete }: ItemCardProps) {
  return (
    <>
      {items.length > 0 &&
        items.map(({ id, name, price, quantity, category }) => {
          return (
            <Card key={id} shadow="sm" padding="lg" radius="md" withBorder>
              <Group>
                <Text>
                  {name} {price.toLocaleString()} Baht x{" "}
                  {quantity.toLocaleString()} ={" "}
                  {(Number(price) * Number(quantity)).toLocaleString()} Baht
                </Text>
                <Badge variant="light" color="green">
                  {category}
                </Badge>
                <ActionIcon
                  variant="light"
                  color="red"
                  aria-label="Delete"
                  size={"sm"}
                  onClick={() => onDelete(id)}
                >
                  <IconTrash />
                </ActionIcon>
              </Group>
            </Card>
          );
        })}
    </>
  );
}
