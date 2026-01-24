import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
export type WorkerModel = runtime.Types.Result.DefaultSelection<Prisma.$WorkerPayload>;
export type AggregateWorker = {
    _count: WorkerCountAggregateOutputType | null;
    _avg: WorkerAvgAggregateOutputType | null;
    _sum: WorkerSumAggregateOutputType | null;
    _min: WorkerMinAggregateOutputType | null;
    _max: WorkerMaxAggregateOutputType | null;
};
export type WorkerAvgAggregateOutputType = {
    rating: number | null;
    reviews: number | null;
    experience: number | null;
    distance: number | null;
};
export type WorkerSumAggregateOutputType = {
    rating: number | null;
    reviews: number | null;
    experience: number | null;
    distance: number | null;
};
export type WorkerMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    phone: string | null;
    email: string | null;
    service: string | null;
    rating: number | null;
    reviews: number | null;
    experience: number | null;
    languages: string | null;
    verified: boolean | null;
    distance: number | null;
    availability: boolean | null;
    image: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WorkerMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    phone: string | null;
    email: string | null;
    service: string | null;
    rating: number | null;
    reviews: number | null;
    experience: number | null;
    languages: string | null;
    verified: boolean | null;
    distance: number | null;
    availability: boolean | null;
    image: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WorkerCountAggregateOutputType = {
    id: number;
    name: number;
    phone: number;
    email: number;
    service: number;
    rating: number;
    reviews: number;
    experience: number;
    languages: number;
    verified: number;
    distance: number;
    availability: number;
    image: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type WorkerAvgAggregateInputType = {
    rating?: true;
    reviews?: true;
    experience?: true;
    distance?: true;
};
export type WorkerSumAggregateInputType = {
    rating?: true;
    reviews?: true;
    experience?: true;
    distance?: true;
};
export type WorkerMinAggregateInputType = {
    id?: true;
    name?: true;
    phone?: true;
    email?: true;
    service?: true;
    rating?: true;
    reviews?: true;
    experience?: true;
    languages?: true;
    verified?: true;
    distance?: true;
    availability?: true;
    image?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WorkerMaxAggregateInputType = {
    id?: true;
    name?: true;
    phone?: true;
    email?: true;
    service?: true;
    rating?: true;
    reviews?: true;
    experience?: true;
    languages?: true;
    verified?: true;
    distance?: true;
    availability?: true;
    image?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WorkerCountAggregateInputType = {
    id?: true;
    name?: true;
    phone?: true;
    email?: true;
    service?: true;
    rating?: true;
    reviews?: true;
    experience?: true;
    languages?: true;
    verified?: true;
    distance?: true;
    availability?: true;
    image?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type WorkerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkerWhereInput;
    orderBy?: Prisma.WorkerOrderByWithRelationInput | Prisma.WorkerOrderByWithRelationInput[];
    cursor?: Prisma.WorkerWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WorkerCountAggregateInputType;
    _avg?: WorkerAvgAggregateInputType;
    _sum?: WorkerSumAggregateInputType;
    _min?: WorkerMinAggregateInputType;
    _max?: WorkerMaxAggregateInputType;
};
export type GetWorkerAggregateType<T extends WorkerAggregateArgs> = {
    [P in keyof T & keyof AggregateWorker]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWorker[P]> : Prisma.GetScalarType<T[P], AggregateWorker[P]>;
};
export type WorkerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkerWhereInput;
    orderBy?: Prisma.WorkerOrderByWithAggregationInput | Prisma.WorkerOrderByWithAggregationInput[];
    by: Prisma.WorkerScalarFieldEnum[] | Prisma.WorkerScalarFieldEnum;
    having?: Prisma.WorkerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkerCountAggregateInputType | true;
    _avg?: WorkerAvgAggregateInputType;
    _sum?: WorkerSumAggregateInputType;
    _min?: WorkerMinAggregateInputType;
    _max?: WorkerMaxAggregateInputType;
};
export type WorkerGroupByOutputType = {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    service: string;
    rating: number;
    reviews: number;
    experience: number;
    languages: string;
    verified: boolean;
    distance: number;
    availability: boolean;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: WorkerCountAggregateOutputType | null;
    _avg: WorkerAvgAggregateOutputType | null;
    _sum: WorkerSumAggregateOutputType | null;
    _min: WorkerMinAggregateOutputType | null;
    _max: WorkerMaxAggregateOutputType | null;
};
type GetWorkerGroupByPayload<T extends WorkerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WorkerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WorkerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WorkerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WorkerGroupByOutputType[P]>;
}>>;
export type WorkerWhereInput = {
    AND?: Prisma.WorkerWhereInput | Prisma.WorkerWhereInput[];
    OR?: Prisma.WorkerWhereInput[];
    NOT?: Prisma.WorkerWhereInput | Prisma.WorkerWhereInput[];
    id?: Prisma.StringFilter<"Worker"> | string;
    name?: Prisma.StringFilter<"Worker"> | string;
    phone?: Prisma.StringFilter<"Worker"> | string;
    email?: Prisma.StringNullableFilter<"Worker"> | string | null;
    service?: Prisma.StringFilter<"Worker"> | string;
    rating?: Prisma.FloatFilter<"Worker"> | number;
    reviews?: Prisma.IntFilter<"Worker"> | number;
    experience?: Prisma.IntFilter<"Worker"> | number;
    languages?: Prisma.StringFilter<"Worker"> | string;
    verified?: Prisma.BoolFilter<"Worker"> | boolean;
    distance?: Prisma.FloatFilter<"Worker"> | number;
    availability?: Prisma.BoolFilter<"Worker"> | boolean;
    image?: Prisma.StringNullableFilter<"Worker"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Worker"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Worker"> | Date | string;
    bookings?: Prisma.BookingListRelationFilter;
};
export type WorkerOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    service?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviews?: Prisma.SortOrder;
    experience?: Prisma.SortOrder;
    languages?: Prisma.SortOrder;
    verified?: Prisma.SortOrder;
    distance?: Prisma.SortOrder;
    availability?: Prisma.SortOrder;
    image?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    bookings?: Prisma.BookingOrderByRelationAggregateInput;
};
export type WorkerWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    phone?: string;
    email?: string;
    AND?: Prisma.WorkerWhereInput | Prisma.WorkerWhereInput[];
    OR?: Prisma.WorkerWhereInput[];
    NOT?: Prisma.WorkerWhereInput | Prisma.WorkerWhereInput[];
    name?: Prisma.StringFilter<"Worker"> | string;
    service?: Prisma.StringFilter<"Worker"> | string;
    rating?: Prisma.FloatFilter<"Worker"> | number;
    reviews?: Prisma.IntFilter<"Worker"> | number;
    experience?: Prisma.IntFilter<"Worker"> | number;
    languages?: Prisma.StringFilter<"Worker"> | string;
    verified?: Prisma.BoolFilter<"Worker"> | boolean;
    distance?: Prisma.FloatFilter<"Worker"> | number;
    availability?: Prisma.BoolFilter<"Worker"> | boolean;
    image?: Prisma.StringNullableFilter<"Worker"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Worker"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Worker"> | Date | string;
    bookings?: Prisma.BookingListRelationFilter;
}, "id" | "phone" | "email">;
export type WorkerOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    service?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviews?: Prisma.SortOrder;
    experience?: Prisma.SortOrder;
    languages?: Prisma.SortOrder;
    verified?: Prisma.SortOrder;
    distance?: Prisma.SortOrder;
    availability?: Prisma.SortOrder;
    image?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.WorkerCountOrderByAggregateInput;
    _avg?: Prisma.WorkerAvgOrderByAggregateInput;
    _max?: Prisma.WorkerMaxOrderByAggregateInput;
    _min?: Prisma.WorkerMinOrderByAggregateInput;
    _sum?: Prisma.WorkerSumOrderByAggregateInput;
};
export type WorkerScalarWhereWithAggregatesInput = {
    AND?: Prisma.WorkerScalarWhereWithAggregatesInput | Prisma.WorkerScalarWhereWithAggregatesInput[];
    OR?: Prisma.WorkerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WorkerScalarWhereWithAggregatesInput | Prisma.WorkerScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Worker"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Worker"> | string;
    phone?: Prisma.StringWithAggregatesFilter<"Worker"> | string;
    email?: Prisma.StringNullableWithAggregatesFilter<"Worker"> | string | null;
    service?: Prisma.StringWithAggregatesFilter<"Worker"> | string;
    rating?: Prisma.FloatWithAggregatesFilter<"Worker"> | number;
    reviews?: Prisma.IntWithAggregatesFilter<"Worker"> | number;
    experience?: Prisma.IntWithAggregatesFilter<"Worker"> | number;
    languages?: Prisma.StringWithAggregatesFilter<"Worker"> | string;
    verified?: Prisma.BoolWithAggregatesFilter<"Worker"> | boolean;
    distance?: Prisma.FloatWithAggregatesFilter<"Worker"> | number;
    availability?: Prisma.BoolWithAggregatesFilter<"Worker"> | boolean;
    image?: Prisma.StringNullableWithAggregatesFilter<"Worker"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Worker"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Worker"> | Date | string;
};
export type WorkerCreateInput = {
    id?: string;
    name: string;
    phone: string;
    email?: string | null;
    service: string;
    rating?: number;
    reviews?: number;
    experience: number;
    languages?: string;
    verified?: boolean;
    distance?: number;
    availability?: boolean;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingCreateNestedManyWithoutWorkerInput;
};
export type WorkerUncheckedCreateInput = {
    id?: string;
    name: string;
    phone: string;
    email?: string | null;
    service: string;
    rating?: number;
    reviews?: number;
    experience: number;
    languages?: string;
    verified?: boolean;
    distance?: number;
    availability?: boolean;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutWorkerInput;
};
export type WorkerUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    service?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviews?: Prisma.IntFieldUpdateOperationsInput | number;
    experience?: Prisma.IntFieldUpdateOperationsInput | number;
    languages?: Prisma.StringFieldUpdateOperationsInput | string;
    verified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    distance?: Prisma.FloatFieldUpdateOperationsInput | number;
    availability?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUpdateManyWithoutWorkerNestedInput;
};
export type WorkerUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    service?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviews?: Prisma.IntFieldUpdateOperationsInput | number;
    experience?: Prisma.IntFieldUpdateOperationsInput | number;
    languages?: Prisma.StringFieldUpdateOperationsInput | string;
    verified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    distance?: Prisma.FloatFieldUpdateOperationsInput | number;
    availability?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutWorkerNestedInput;
};
export type WorkerCreateManyInput = {
    id?: string;
    name: string;
    phone: string;
    email?: string | null;
    service: string;
    rating?: number;
    reviews?: number;
    experience: number;
    languages?: string;
    verified?: boolean;
    distance?: number;
    availability?: boolean;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkerUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    service?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviews?: Prisma.IntFieldUpdateOperationsInput | number;
    experience?: Prisma.IntFieldUpdateOperationsInput | number;
    languages?: Prisma.StringFieldUpdateOperationsInput | string;
    verified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    distance?: Prisma.FloatFieldUpdateOperationsInput | number;
    availability?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkerUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    service?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviews?: Prisma.IntFieldUpdateOperationsInput | number;
    experience?: Prisma.IntFieldUpdateOperationsInput | number;
    languages?: Prisma.StringFieldUpdateOperationsInput | string;
    verified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    distance?: Prisma.FloatFieldUpdateOperationsInput | number;
    availability?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkerCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    service?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviews?: Prisma.SortOrder;
    experience?: Prisma.SortOrder;
    languages?: Prisma.SortOrder;
    verified?: Prisma.SortOrder;
    distance?: Prisma.SortOrder;
    availability?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkerAvgOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    reviews?: Prisma.SortOrder;
    experience?: Prisma.SortOrder;
    distance?: Prisma.SortOrder;
};
export type WorkerMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    service?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviews?: Prisma.SortOrder;
    experience?: Prisma.SortOrder;
    languages?: Prisma.SortOrder;
    verified?: Prisma.SortOrder;
    distance?: Prisma.SortOrder;
    availability?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkerMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    service?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviews?: Prisma.SortOrder;
    experience?: Prisma.SortOrder;
    languages?: Prisma.SortOrder;
    verified?: Prisma.SortOrder;
    distance?: Prisma.SortOrder;
    availability?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkerSumOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    reviews?: Prisma.SortOrder;
    experience?: Prisma.SortOrder;
    distance?: Prisma.SortOrder;
};
export type WorkerScalarRelationFilter = {
    is?: Prisma.WorkerWhereInput;
    isNot?: Prisma.WorkerWhereInput;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type WorkerCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.WorkerCreateWithoutBookingsInput, Prisma.WorkerUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.WorkerCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.WorkerWhereUniqueInput;
};
export type WorkerUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.WorkerCreateWithoutBookingsInput, Prisma.WorkerUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.WorkerCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.WorkerUpsertWithoutBookingsInput;
    connect?: Prisma.WorkerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkerUpdateToOneWithWhereWithoutBookingsInput, Prisma.WorkerUpdateWithoutBookingsInput>, Prisma.WorkerUncheckedUpdateWithoutBookingsInput>;
};
export type WorkerCreateWithoutBookingsInput = {
    id?: string;
    name: string;
    phone: string;
    email?: string | null;
    service: string;
    rating?: number;
    reviews?: number;
    experience: number;
    languages?: string;
    verified?: boolean;
    distance?: number;
    availability?: boolean;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkerUncheckedCreateWithoutBookingsInput = {
    id?: string;
    name: string;
    phone: string;
    email?: string | null;
    service: string;
    rating?: number;
    reviews?: number;
    experience: number;
    languages?: string;
    verified?: boolean;
    distance?: number;
    availability?: boolean;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkerCreateOrConnectWithoutBookingsInput = {
    where: Prisma.WorkerWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkerCreateWithoutBookingsInput, Prisma.WorkerUncheckedCreateWithoutBookingsInput>;
};
export type WorkerUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.WorkerUpdateWithoutBookingsInput, Prisma.WorkerUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.WorkerCreateWithoutBookingsInput, Prisma.WorkerUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.WorkerWhereInput;
};
export type WorkerUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.WorkerWhereInput;
    data: Prisma.XOR<Prisma.WorkerUpdateWithoutBookingsInput, Prisma.WorkerUncheckedUpdateWithoutBookingsInput>;
};
export type WorkerUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    service?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviews?: Prisma.IntFieldUpdateOperationsInput | number;
    experience?: Prisma.IntFieldUpdateOperationsInput | number;
    languages?: Prisma.StringFieldUpdateOperationsInput | string;
    verified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    distance?: Prisma.FloatFieldUpdateOperationsInput | number;
    availability?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkerUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    service?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviews?: Prisma.IntFieldUpdateOperationsInput | number;
    experience?: Prisma.IntFieldUpdateOperationsInput | number;
    languages?: Prisma.StringFieldUpdateOperationsInput | string;
    verified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    distance?: Prisma.FloatFieldUpdateOperationsInput | number;
    availability?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkerCountOutputType = {
    bookings: number;
};
export type WorkerCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bookings?: boolean | WorkerCountOutputTypeCountBookingsArgs;
};
export type WorkerCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerCountOutputTypeSelect<ExtArgs> | null;
};
export type WorkerCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type WorkerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    phone?: boolean;
    email?: boolean;
    service?: boolean;
    rating?: boolean;
    reviews?: boolean;
    experience?: boolean;
    languages?: boolean;
    verified?: boolean;
    distance?: boolean;
    availability?: boolean;
    image?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    bookings?: boolean | Prisma.Worker$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.WorkerCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["worker"]>;
export type WorkerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    phone?: boolean;
    email?: boolean;
    service?: boolean;
    rating?: boolean;
    reviews?: boolean;
    experience?: boolean;
    languages?: boolean;
    verified?: boolean;
    distance?: boolean;
    availability?: boolean;
    image?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["worker"]>;
export type WorkerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    phone?: boolean;
    email?: boolean;
    service?: boolean;
    rating?: boolean;
    reviews?: boolean;
    experience?: boolean;
    languages?: boolean;
    verified?: boolean;
    distance?: boolean;
    availability?: boolean;
    image?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["worker"]>;
export type WorkerSelectScalar = {
    id?: boolean;
    name?: boolean;
    phone?: boolean;
    email?: boolean;
    service?: boolean;
    rating?: boolean;
    reviews?: boolean;
    experience?: boolean;
    languages?: boolean;
    verified?: boolean;
    distance?: boolean;
    availability?: boolean;
    image?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type WorkerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "phone" | "email" | "service" | "rating" | "reviews" | "experience" | "languages" | "verified" | "distance" | "availability" | "image" | "createdAt" | "updatedAt", ExtArgs["result"]["worker"]>;
export type WorkerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bookings?: boolean | Prisma.Worker$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.WorkerCountOutputTypeDefaultArgs<ExtArgs>;
};
export type WorkerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type WorkerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $WorkerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Worker";
    objects: {
        bookings: Prisma.$BookingPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        phone: string;
        email: string | null;
        service: string;
        rating: number;
        reviews: number;
        experience: number;
        languages: string;
        verified: boolean;
        distance: number;
        availability: boolean;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["worker"]>;
    composites: {};
};
export type WorkerGetPayload<S extends boolean | null | undefined | WorkerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WorkerPayload, S>;
export type WorkerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WorkerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorkerCountAggregateInputType | true;
};
export interface WorkerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Worker'];
        meta: {
            name: 'Worker';
        };
    };
    findUnique<T extends WorkerFindUniqueArgs>(args: Prisma.SelectSubset<T, WorkerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WorkerClient<runtime.Types.Result.GetResult<Prisma.$WorkerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WorkerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WorkerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkerClient<runtime.Types.Result.GetResult<Prisma.$WorkerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WorkerFindFirstArgs>(args?: Prisma.SelectSubset<T, WorkerFindFirstArgs<ExtArgs>>): Prisma.Prisma__WorkerClient<runtime.Types.Result.GetResult<Prisma.$WorkerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WorkerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WorkerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkerClient<runtime.Types.Result.GetResult<Prisma.$WorkerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WorkerFindManyArgs>(args?: Prisma.SelectSubset<T, WorkerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WorkerCreateArgs>(args: Prisma.SelectSubset<T, WorkerCreateArgs<ExtArgs>>): Prisma.Prisma__WorkerClient<runtime.Types.Result.GetResult<Prisma.$WorkerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WorkerCreateManyArgs>(args?: Prisma.SelectSubset<T, WorkerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WorkerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WorkerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WorkerDeleteArgs>(args: Prisma.SelectSubset<T, WorkerDeleteArgs<ExtArgs>>): Prisma.Prisma__WorkerClient<runtime.Types.Result.GetResult<Prisma.$WorkerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WorkerUpdateArgs>(args: Prisma.SelectSubset<T, WorkerUpdateArgs<ExtArgs>>): Prisma.Prisma__WorkerClient<runtime.Types.Result.GetResult<Prisma.$WorkerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WorkerDeleteManyArgs>(args?: Prisma.SelectSubset<T, WorkerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WorkerUpdateManyArgs>(args: Prisma.SelectSubset<T, WorkerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WorkerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WorkerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WorkerUpsertArgs>(args: Prisma.SelectSubset<T, WorkerUpsertArgs<ExtArgs>>): Prisma.Prisma__WorkerClient<runtime.Types.Result.GetResult<Prisma.$WorkerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WorkerCountArgs>(args?: Prisma.Subset<T, WorkerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WorkerCountAggregateOutputType> : number>;
    aggregate<T extends WorkerAggregateArgs>(args: Prisma.Subset<T, WorkerAggregateArgs>): Prisma.PrismaPromise<GetWorkerAggregateType<T>>;
    groupBy<T extends WorkerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WorkerGroupByArgs['orderBy'];
    } : {
        orderBy?: WorkerGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WorkerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WorkerFieldRefs;
}
export interface Prisma__WorkerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    bookings<T extends Prisma.Worker$bookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Worker$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WorkerFieldRefs {
    readonly id: Prisma.FieldRef<"Worker", 'String'>;
    readonly name: Prisma.FieldRef<"Worker", 'String'>;
    readonly phone: Prisma.FieldRef<"Worker", 'String'>;
    readonly email: Prisma.FieldRef<"Worker", 'String'>;
    readonly service: Prisma.FieldRef<"Worker", 'String'>;
    readonly rating: Prisma.FieldRef<"Worker", 'Float'>;
    readonly reviews: Prisma.FieldRef<"Worker", 'Int'>;
    readonly experience: Prisma.FieldRef<"Worker", 'Int'>;
    readonly languages: Prisma.FieldRef<"Worker", 'String'>;
    readonly verified: Prisma.FieldRef<"Worker", 'Boolean'>;
    readonly distance: Prisma.FieldRef<"Worker", 'Float'>;
    readonly availability: Prisma.FieldRef<"Worker", 'Boolean'>;
    readonly image: Prisma.FieldRef<"Worker", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Worker", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Worker", 'DateTime'>;
}
export type WorkerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSelect<ExtArgs> | null;
    omit?: Prisma.WorkerOmit<ExtArgs> | null;
    include?: Prisma.WorkerInclude<ExtArgs> | null;
    where: Prisma.WorkerWhereUniqueInput;
};
export type WorkerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSelect<ExtArgs> | null;
    omit?: Prisma.WorkerOmit<ExtArgs> | null;
    include?: Prisma.WorkerInclude<ExtArgs> | null;
    where: Prisma.WorkerWhereUniqueInput;
};
export type WorkerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSelect<ExtArgs> | null;
    omit?: Prisma.WorkerOmit<ExtArgs> | null;
    include?: Prisma.WorkerInclude<ExtArgs> | null;
    where?: Prisma.WorkerWhereInput;
    orderBy?: Prisma.WorkerOrderByWithRelationInput | Prisma.WorkerOrderByWithRelationInput[];
    cursor?: Prisma.WorkerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkerScalarFieldEnum | Prisma.WorkerScalarFieldEnum[];
};
export type WorkerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSelect<ExtArgs> | null;
    omit?: Prisma.WorkerOmit<ExtArgs> | null;
    include?: Prisma.WorkerInclude<ExtArgs> | null;
    where?: Prisma.WorkerWhereInput;
    orderBy?: Prisma.WorkerOrderByWithRelationInput | Prisma.WorkerOrderByWithRelationInput[];
    cursor?: Prisma.WorkerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkerScalarFieldEnum | Prisma.WorkerScalarFieldEnum[];
};
export type WorkerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSelect<ExtArgs> | null;
    omit?: Prisma.WorkerOmit<ExtArgs> | null;
    include?: Prisma.WorkerInclude<ExtArgs> | null;
    where?: Prisma.WorkerWhereInput;
    orderBy?: Prisma.WorkerOrderByWithRelationInput | Prisma.WorkerOrderByWithRelationInput[];
    cursor?: Prisma.WorkerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkerScalarFieldEnum | Prisma.WorkerScalarFieldEnum[];
};
export type WorkerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSelect<ExtArgs> | null;
    omit?: Prisma.WorkerOmit<ExtArgs> | null;
    include?: Prisma.WorkerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkerCreateInput, Prisma.WorkerUncheckedCreateInput>;
};
export type WorkerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WorkerCreateManyInput | Prisma.WorkerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WorkerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkerOmit<ExtArgs> | null;
    data: Prisma.WorkerCreateManyInput | Prisma.WorkerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WorkerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSelect<ExtArgs> | null;
    omit?: Prisma.WorkerOmit<ExtArgs> | null;
    include?: Prisma.WorkerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkerUpdateInput, Prisma.WorkerUncheckedUpdateInput>;
    where: Prisma.WorkerWhereUniqueInput;
};
export type WorkerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WorkerUpdateManyMutationInput, Prisma.WorkerUncheckedUpdateManyInput>;
    where?: Prisma.WorkerWhereInput;
    limit?: number;
};
export type WorkerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkerUpdateManyMutationInput, Prisma.WorkerUncheckedUpdateManyInput>;
    where?: Prisma.WorkerWhereInput;
    limit?: number;
};
export type WorkerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSelect<ExtArgs> | null;
    omit?: Prisma.WorkerOmit<ExtArgs> | null;
    include?: Prisma.WorkerInclude<ExtArgs> | null;
    where: Prisma.WorkerWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkerCreateInput, Prisma.WorkerUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WorkerUpdateInput, Prisma.WorkerUncheckedUpdateInput>;
};
export type WorkerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSelect<ExtArgs> | null;
    omit?: Prisma.WorkerOmit<ExtArgs> | null;
    include?: Prisma.WorkerInclude<ExtArgs> | null;
    where: Prisma.WorkerWhereUniqueInput;
};
export type WorkerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkerWhereInput;
    limit?: number;
};
export type Worker$bookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
export type WorkerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSelect<ExtArgs> | null;
    omit?: Prisma.WorkerOmit<ExtArgs> | null;
    include?: Prisma.WorkerInclude<ExtArgs> | null;
};
export {};
