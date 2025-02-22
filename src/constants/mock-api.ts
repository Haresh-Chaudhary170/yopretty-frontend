////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Define the shape of Service data
export type Service = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

// Mock service data store
export const fakeServices = {
  records: [] as Service[], // Holds the list of service objects

  // Initialize with sample data
  initialize() {
    const sampleServices: Service[] = [];
    function generateRandomServiceData(id: number): Service {
      const categories = [
        'Electronics',
        'Furniture',
        'Clothing',
        'Toys',
        'Groceries',
        'Books',
        'Jewelry',
        'Beauty Services'
      ];

      return {
        id,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        created_at: faker.date
          .between({ from: '2022-01-01', to: '2023-12-31' })
          .toISOString(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
        photo_url: `https://api.slingacademy.com/public/sample-product/${id}.png`,
        category: faker.helpers.arrayElement(categories),
        updated_at: faker.date.recent().toISOString()
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleServices.push(generateRandomServiceData(i));
    }

    this.records = sampleServices;
  },

  // Get all services with optional category filtering and search
  async getAll({
    categories = [],
    search
  }: {
    categories?: string[];
    search?: string;
  }) {
    let services = [...this.records];

    // Filter services based on selected categories
    if (categories.length > 0) {
      services = services.filter((service) =>
        categories.includes(service.category)
      );
    }

    // Search functionality across multiple fields
    if (search) {
      services = matchSorter(services, search, {
        keys: ['name', 'description', 'category']
      });
    }

    return services;
  },

  // Get paginated results with optional category filtering and search
  async getServices({
    page = 1,
    limit = 10,
    categories,
    search
  }: {
    page?: number;
    limit?: number;
    categories?: string;
    search?: string;
  }) {
    await delay(1000);
    const categoriesArray = categories ? categories.split('.') : [];
    const allServices = await this.getAll({
      categories: categoriesArray,
      search
    });
    const totalServices = allServices.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedServices = allServices.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_services: totalServices,
      offset,
      limit,
      services: paginatedServices
    };
  },

  // Get a specific service by its ID
  async getServiceById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the service by its ID
    const service = this.records.find((service) => service.id === id);

    if (!service) {
      return {
        success: false,
        message: `Service with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Service with ID ${id} found`,
      service
    };
  }
};

// Initialize sample services
fakeServices.initialize();
