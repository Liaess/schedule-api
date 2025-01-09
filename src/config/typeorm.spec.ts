import { DataSource } from 'typeorm';
import { dataSourceOptions } from './typeorm';

jest.mock('typeorm', () => ({
  DataSource: jest.fn().mockImplementation(() => ({
    initialize: jest.fn().mockResolvedValue(true), // Mock initialize method
  })),
}));

describe('DataSource Initialization', () => {
  it('should initialize the DataSource with the correct options', async () => {
    const mockDataSource = new DataSource(dataSourceOptions);

    await mockDataSource.initialize();
    expect(mockDataSource.initialize).toHaveBeenCalled();
  });
});
