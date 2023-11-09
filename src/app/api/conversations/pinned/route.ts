import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { id, message, image, conversationId } = body;
    // console.log("server BODY", body);
    // console.log("server MESSAGE", message);
    // console.log("server conversationId", conversationId);
    console.log("server ID", id);
    // const { message, image, conversationId } = body;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const pinnedMessage = await prisma.message.update({
      where: {
        id: id,
      },
      data: {
        pinned: true,
      },
    });
    // const conversation = await prisma.conversation.findUnique({
    //   where: {
    //     // id: conversationId,
    //   },
    //   include: {
    //     messages: {
    //       include: {
    //         seen: true,
    //       },
    //     },
    //     users: true,
    //   },
    // });

    // if (!conversation) {
    //   return new NextResponse("Invalid ID", { status: 400 });
    // }

    // const targetMessage = conversation

    // const pinMessage = await prisma.message.update({
    //   where: {
    //       id: ,
    //   }
    // })
    return NextResponse.json(pinnedMessage);
  } catch (error: any) {
    console.log(error, "ERROR_PINNING");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
