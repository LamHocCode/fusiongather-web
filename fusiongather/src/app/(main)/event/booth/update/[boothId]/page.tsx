import React from "react";
import { Metadata } from "next";
import { getBoothById, isBoothAuthor } from "@/lib/actions/booth";
import { BoothForm } from "@/components/shared/BoothForm";
import { BoothType } from "@/lib/type";
import UnauthorizedPage from "@/components/shared/UnauthorizedPage";
import NotFoundPage from "@/components/shared/NotFoundPage";

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
    const booth = await getBoothById(boothId)
    if (booth?.message) {
        return <NotFoundPage />
    }
    const isBoothOwner = await isBoothAuthor(booth.vendorId.id)

    if (!isBoothOwner ) {
        return <UnauthorizedPage />
    }
    return (
        <section className="bg-gray-100 sm:px-8 px-2 py-4">
            <BoothForm booth={booth} type="Update" boothId={booth.id} />
        </section>
    )
}


