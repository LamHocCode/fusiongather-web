import React from "react";
import { Metadata } from "next";
import { getBoothById } from "@/lib/actions/booth";
import { BoothForm } from "@/components/shared/BoothForm";
import { BoothType } from "@/lib/type";

interface Props {
    params: {
        boothId: number
    }
}

export async function generateMetadata({ params: { boothId } }: Props): Promise<Metadata> {
  try {
      let booth = boothId
      if (!booth) {
          return {
              title: "Not Found",
              description: "The page you are looking for does not exist."
          }
      }
      return {
          title: String(boothId),
          description: String(boothId)
      }
  } catch (error: any) {
      return {
          title: "Not Found",
          description: "The page you are looking for does not exist."
      }
  }
}

export default async function UpdateBooth({ params: { boothId } }: Props) {
    const booth: BoothType = await getBoothById(boothId)
    return (
        <main className="mt-[90px] min-h-screen">
            <BoothForm booth={booth} type="Update" boothId={booth.id}/>
        </main>
    )
    }


