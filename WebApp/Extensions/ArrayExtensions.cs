using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace WebApp.Extensions;

public static class ArrayExtensions
{
    public static void Iterate<TSource>(this TSource[] source, Action<TSource> action)
    {
        ref var start = ref MemoryMarshal.GetArrayDataReference(source);
        ref var end = ref Unsafe.Add(ref start, source.Length);

        while (Unsafe.IsAddressLessThan(ref start, ref end))
        {
            action(start);
            start = ref Unsafe.Add(ref start, 1);
        }
    }
}