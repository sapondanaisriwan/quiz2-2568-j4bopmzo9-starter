import { useState } from "react";
import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Button,
  Stack,
} from "@mantine/core";

type AddFoodModalProps = {
  opened: boolean;
  onClose: () => void;
  categories: string[];
  onAdd: (
    name: string,
    price: number | string,
    quantity: number | string,
    category: string
  ) => void;
};

export default function AddFoodModal({
  opened,
  onClose,
  onAdd,
  categories,
}: AddFoodModalProps) {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | string>(0);
  const [quantity, setQuantity] = useState<number | string>(0);
  const [category, setCategory] = useState<string | null>(null);

  const handleSubmit = () => {
    if (
      name.trim() !== "" &&
      Number(price) > 0 &&
      Number(quantity) > 0 &&
      category != null
    ) {
      console.log(name, price, quantity, category);
      onAdd(name, price, quantity, category);
      setName("");
      setPrice(0);
      setQuantity(0);
      setCategory(null);
      onClose();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add an item">
      <Stack>
        <TextInput
          label="Name of item"
          withAsterisk
          description="Name of item"
          error={name === "" && "Name of item is required"}
          placeholder="e.g. Chicken rice"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
      </Stack>
      <NumberInput
        label="Price per dish"
        withAsterisk
        description="Price per dish"
        error={
          (price === "" || Number(price) <= 0) && "Price per dish is required"
        }
        min={0}
        value={price}
        onChange={setPrice}
        mt="md"
        allowDecimal={false}
      />
      <NumberInput
        label="Quantity"
        withAsterisk
        description="Quantity"
        error={(quantity === "" || Number(quantity) <= 0) && "Quantity is required"}
        min={0}
        value={quantity}
        onChange={setQuantity}
        mt="md"
        allowDecimal={false}
      />
      <Select
        label="Category"
        withAsterisk
        description="Category"
        error={category === null && "Category is required"}
        placeholder="Select a category"
        data={categories}
        value={category}
        onChange={setCategory}
        mt="md"
      />
      <Button fullWidth mt="md" onClick={handleSubmit}>
        Submit
      </Button>
    </Modal>
  );
}
