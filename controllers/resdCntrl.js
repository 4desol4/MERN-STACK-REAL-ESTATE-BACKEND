import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    city,
    country,
    image,
    images,
    facilities,
    userEmail,
    forStatus,
  } = req.body;
  console.log(req.body);
  if (
    !title ||
    !description ||
    !price ||
    !address ||
    !city ||
    !country ||
    (!image && (!images || images.length === 0)) ||
    !userEmail ||
    !forStatus
  ) {
    throw new Error("All required fields must be provided.");
  }

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price: parseInt(price),
        address,
        city,
        country,
        image: images[0], // fallback
        images,
        facilities: facilities || {},
        forStatus,
        owner: {
          connect: { email: userEmail },
        },
      },
    });

    res.status(201).json(residency);
  } catch (error) {
    console.error("Residency creation failed:", error);
    res.status(500);
    throw new Error("Something went wrong while creating the residency.");
  }
});

// Get all residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

// Get one residency by ID
export const getResidency = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const residency = await prisma.residency.findUnique({
      where: { id },
    });

    if (!residency) {
      return res.status(404).json({ error: "Residency not found" });
    }

    res.status(200).json(residency);
  } catch (error) {
    console.error("Error fetching residency:", error.message);
    res.status(500).json({ error: "Failed to fetch residency" });
  }
});
