using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace WebApp.Extensions;

public static class ArrayExtensions
{
    public static void Iterate<TSource>(this TSource[] array, Action<TSource> action)
    {
        ref var start = ref MemoryMarshal.GetArrayDataReference(array);
        ref var end = ref Unsafe.Add(ref start, array.Length);

        while (Unsafe.IsAddressLessThan(ref start, ref end))
        {
            action(start);
            start = ref Unsafe.Add(ref start, 1);
        }
    }
}