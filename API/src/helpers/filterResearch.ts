import { IProperty, getProperties } from "../Models/property";

async function filterPropertiesResearch(
  criteria: any,
  properties: IProperty[]
): Promise<IProperty[]> {
  const filteredProperties = [];

  for (const property of properties) {
    let isValid = true;

    if (criteria.maxPrice && property.price > criteria.maxPrice) {
      isValid = false;
    }

    // Check address (if provided)
    if (
      criteria.city &&
      property.city.toLowerCase() !== criteria.city.toLowerCase()
    ) {
      isValid = false;
    }

    // Check number of beds (if provided)
    if (criteria.minBeds && property.numSleeps < criteria.minBeds) {
      isValid = false;
    }

    // Check number of bedrooms (if provided)
    if (criteria.numBedrooms && property.numBedrooms < criteria.minBedrooms) {
      isValid = false;
    }

    // Check review score (if provided)
    if (
      criteria.minReviewScore &&
      property.review === "" &&
      property.review < criteria.minReviewScore
    ) {
      isValid = false;
    }
    if (criteria.maxDistance && property.distance > criteria.maxDistance) {
      isValid = false;
    }

    if (isValid) {
      filteredProperties.push(property);
    }
  }

  return filteredProperties;
}

export { filterPropertiesResearch };
