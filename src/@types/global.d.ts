type WithoutId<T extends { id: any }> = Omit<T, "id">;
