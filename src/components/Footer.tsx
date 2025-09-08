import { Text, Group } from "@mantine/core";

interface FooterProps {
  studentName: string;
  studentId: number;
  subject: string;
  year: number;
}

export default function Footer({
  studentName,
  studentId,
  subject,
  year,
}: FooterProps) {
  return (
    <Group p="md" justify="center">
      <Text>
        © {studentName} {studentId} {subject}-{year}. All rights reserved.
      </Text>
    </Group>
  );
}
