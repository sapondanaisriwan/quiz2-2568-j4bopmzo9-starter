import { useEffect, useState } from "react";
import { Button, Stack, Title, Divider, Container } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import { useDisclosure } from "@mantine/hooks";
import AddFoodModal from "../components/Modal";
import ItemCard from "../components/ItemCard";

type FoodItem = {
  id: string;
  name: string;
  price: number | string;
  quantity: number | string;
  category: string;
};

export default function FoodTracker() {
  const [opened, { open, close }] = useDisclosure(false);
  const [items, setItems] = useState<FoodItem[]>([]);
  const categories = ["Main Course", "Drink", "Dessert"];
  const [totalAll, setTotalAll] = useState(0);
  const [totalMain, setTotalMain] = useState(0);
  const [totalDrink, setTotalDrink] = useState(0);
  const [totalDessrt, setTotalDessrt] = useState(0);

  useEffect(() => {
    let sumAll = 0;
    let sumMain = 0;
    let sumDrink = 0;
    let sumDessert = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].category === categories[0]) {
        sumMain += Number(items[i].price) * Number(items[i].quantity);
      } else if (items[i].category === categories[1]) {
        sumDrink += Number(items[i].price) * Number(items[i].quantity);
      } else if (items[i].category === categories[2]) {
        sumDessert += Number(items[i].price) * Number(items[i].quantity);
      }
    }
    sumAll = sumMain + sumDrink + sumDessert;
    setTotalAll(sumAll);
    setTotalMain(sumMain);
    setTotalDrink(sumDrink);
    setTotalDessrt(sumDessert);
  }, [items]);

  const onAdd = (
    name: string,
    price: number | string,
    quantity: number | string,
    category: string
  ) => {
    setItems([
      ...items,
      {
        id: uuidv4(),
        name,
        price: Number(price),
        quantity: Number(quantity),
        category,
      },
    ]);
  };

  const handleDelete = (id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  return (
    <Container style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Title order={2} mb="md">
        Food Tracker
      </Title>
      <Button onClick={open}>Add Food Item</Button>
      {/* Type additional AddFoodModal here. */}
      <AddFoodModal
        opened={opened}
        onClose={close}
        categories={categories}
        onAdd={onAdd}
      />

      <Divider my="md" />
      {/* Type additional total cost here. */}
      <Title order={4}>Total cost: {totalAll.toLocaleString()} Baht</Title>

      <Stack my="md">Main Course: {totalMain.toLocaleString()} Baht</Stack>
      <Stack my="md">Drink: {totalDrink.toLocaleString()} Baht</Stack>
      <Stack my="md">Dessert: {totalDessrt.toLocaleString()} Baht</Stack>

      {/* {JSON.stringify(items)} */}
      <Divider my="md" />
      {/* Type additional card here. */}
      <Stack gap="md">
        <ItemCard items={items} onDelete={handleDelete} />
      </Stack>
    </Container>
  );
}
