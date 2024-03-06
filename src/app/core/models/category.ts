export interface CategoryDto {
    created?: string;
    description: string;
    id?: string;
    name: string;
    type?: string;
    parentCategoryId?: string;
    subCategories?: CategoryDto[];
}
